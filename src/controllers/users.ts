import { fn, col, Op } from 'sequelize';
import { Request, Response } from 'express';
import User from '../models/user.js';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR/index.js';

// Verificar se nome, email ou telefone já foi cadastrado
const checkFieldExists = async (fieldName: string, value: string) => {

    const fieldAlreadyExists = await User.findOne({
        where: {
            [fieldName]: value
        }
    });

    return fieldAlreadyExists;
};

export const getUsers = async (req: Request, res: Response) => {

    const users = await User.findAll({
        attributes: [
            'id',
            'name',
            'email',
            'phone',
            [fn('date_format', col('createdAt'), '%d-%m-%Y %H:%i:%s'), 'createdAt',], // Formatar createdAt
            [fn('date_format', col('updatedAt'), '%d-%m-%Y %H:%i:%s'), 'updatedAt',], // Formatar updatedAt
            [fn('date_format', col('deletedAt'), '%d-%m-%Y %H:%i:%s'), 'deletedAt',], // Formatar deletedAt
        ],
    });

    if (!users || users.length === 0) {
        return res.status(404).json({
            errorId: "user_not_found",
            msg: `Nenhum usuário encontrado.`,
        });
    }

    res.json({ users });

}

export const getUser = async (req: Request, res: Response) => {
    const { name } = req.params;

    const users = await User.findAll({
        attributes: [
            'id',
            'name',
            'email',
            'phone',
            [fn('date_format', col('createdAt'), '%d-%m-%Y %H:%i:%s'), 'createdAt',], // Formatar createdAt
            [fn('date_format', col('updatedAt'), '%d-%m-%Y %H:%i:%s'), 'updatedAt',], // Formatar updatedAt
            [fn('date_format', col('deletedAt'), '%d-%m-%Y %H:%i:%s'), 'deletedAt',], // Formatar deletedAt
        ],
        where: {
            // Buscar por semelhança
            name: {
                [Op.like]: `%${name}%`,
            },
        },
    });

    if (!users || users.length === 0) {
        return res.status(404).json({
            errorId: "user_not_found",
            msg: `Usuário com nome '${name}' não existe.`,
        });
    }

    return res.json({ users });
};

export const getUserByDate = async (req: Request, res: Response) => {

    let { dateRange, name } = req.params;

    const [startDate, endDate] = dateRange.split('+');

    const convertDateFormat = (dateString: string): string => {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`;
    };

    // Converter datas
    const convertedStartDate = new Date(convertDateFormat(startDate));
    const convertedEndDate = new Date(convertDateFormat(endDate || startDate));

    convertedEndDate.setDate(convertedEndDate.getDate() + 1);

    const whereCondition: { [key: string]: any } = {
        // Buscar por semelhança
        name: name ? { [Op.like]: `%${name}%` } : undefined,
        // Filtrar por intervalo de datas
        createdAt: {
            [Op.between]: [convertedStartDate, convertedEndDate],
        },
    };

    // Remover propriedades undefined do objeto whereCondition
    const cleanedWhereCondition = Object.fromEntries(
        Object.entries(whereCondition).filter(([_, value]) => value !== undefined)
    );

    const users = await User.findAll({
        attributes: [
            'id',
            'name',
            'email',
            'phone',
            [fn('date_format', col('createdAt'), '%d-%m-%Y %H:%i:%s'), 'createdAt'],
            [fn('date_format', col('updatedAt'), '%d-%m-%Y %H:%i:%s'), 'updatedAt'],
            [fn('date_format', col('deletedAt'), '%d-%m-%Y %H:%i:%s'), 'deletedAt'],
        ],
        where: cleanedWhereCondition,
    });

    if (!users || users.length === 0) {
        return res.status(404).json({
            errorId: 'user_not_found',
            msg: `Usuário cadastrado no intervalo de datas '${startDate}' a '${endDate || startDate} ' ` + (name ? `com nome '${name} ' ` : ``) + `não existe.`,
        });
    }

    return res.json({ users });
};

export const postUser = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        // Verificar se o email já foi cadastrado
        if (await checkFieldExists('email', body.email)) {
            return res.status(400).json({
                errorId: "email_already_registered",
                msg: `Email '${body.email}' já cadastrado.`
            });
        }

        // Verificar se o nome já foi cadastrado
        if (await checkFieldExists('name', body.name)) {
            return res.status(400).json({
                errorId: "name_already_registered",
                msg: `Nome '${body.name}' já cadastrado.`
            });
        }

        // Verificar se o telefone já foi cadastrado
        if (await checkFieldExists('phone', body.phone)) {
            return res.status(400).json({
                errorId: "phone_already_registered",
                msg: `Telefone '${body.phone}' já cadastrado.`
            });
        }

        const user = new User(body);
        await user.save();

        // Formatar datas antes da resposta
        const formattedUser = {
            ...user.dataValues,
            createdAt: format(user.dataValues.createdAt, 'dd-MM-yyyy HH:mm:ss', { locale: ptBR }),
            updatedAt: format(user.dataValues.updatedAt, 'dd-MM-yyyy HH:mm:ss', { locale: ptBR }),
            deletedAt: user.dataValues.deletedAt ? format(user.dataValues.deletedAt, 'dd-MM-yyyy HH:mm:ss', { locale: ptBR }) : null,
        };

        res.json({ user: formattedUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            errorId: 'unknow_error',
            msg: 'Fale com um administrador.',
        });
    }

};
''

export const putUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        // Buscar usuário por ID
        const user = await User.findByPk(id);

        // Verificar se o ID não foi cadastrado
        if (!user) {
            return res.status(400).json({
                errorId: "id_not_registered",
                msg: `ID '${id}' não cadastrado ou já removido.`
            });
        }

        // Verificar se o email foi alterado e se já foi cadastrado
        if (body.email !== user.dataValues.email && await checkFieldExists('email', body.email)) {
            return res.status(400).json({
                errorId: "email_already_registered",
                msg: `Email '${body.email}' já cadastrado.`
            });
        }

        // Verificar se o nome foi alterado e se já foi cadastrado
        if (body.name !== user.dataValues.name && await checkFieldExists('name', body.name)) {
            return res.status(400).json({
                errorId: "name_already_registered",
                msg: `Nome '${body.name}' já cadastrado.`
            });
        }

        // Verificar se o telefone foi alterado e se já foi cadastrado
        if (body.phone !== user.dataValues.phone && await checkFieldExists('phone', body.phone)) {
            return res.status(400).json({
                errorId: "phone_already_registered",
                msg: `Telefone '${body.phone}' já cadastrado.`
            });
        }

        // Não atualizar caso os dados sejam os mesmos
        if (body.name === user.dataValues.name && body.email === user.dataValues.email && body.phone === user.dataValues.phone) {
            return res.status(400).json({
                errorId: "no_data_modified",
                msg: `Nenhum dado modificado.`
            });
        }

        await user.update(body);

        // Formatar datas antes da resposta
        const formattedUser = {
            ...user.dataValues,
            createdAt: format(user.dataValues.createdAt, 'dd-MM-yyyy HH:mm:ss', { locale: ptBR }),
            updatedAt: format(user.dataValues.updatedAt, 'dd-MM-yyyy HH:mm:ss', { locale: ptBR }),
            deletedAt: user.dataValues.deletedAt ? format(user.dataValues.deletedAt, 'dd-MM-yyyy HH:mm:ss', { locale: ptBR }) : null,
        };

        res.json({ user: formattedUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            errorId: 'unknow_error',
            msg: 'Fale com um administrador.',
        });
    }

}

export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        // Buscar usuário por ID
        const user = await User.findByPk(id);

        // Verificar se o ID não foi cadastrado
        if (!user) {
            return res.status(400).json({
                errorId: "id_not_registered",
                msg: `ID '${id}' não cadastrado ou já removido.`
            });
        }

        await user.destroy();

        // Formatar datas antes da resposta
        const formattedUser = {
            ...user.dataValues,
            createdAt: format(user.dataValues.createdAt, 'dd-MM-yyyy HH:mm:ss', { locale: ptBR }),
            updatedAt: format(user.dataValues.updatedAt, 'dd-MM-yyyy HH:mm:ss', { locale: ptBR }),
            deletedAt: user.dataValues.deletedAt ? format(user.dataValues.deletedAt, 'dd-MM-yyyy HH:mm:ss', { locale: ptBR }) : null,
        };

        res.json({ msg: `Usuário com ID '${id}' removido.`, user: formattedUser });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Fale com um administrador.',
        });
    }

}
