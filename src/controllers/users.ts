import { fn, col } from 'sequelize';
import { Request, Response } from 'express';
import User from '../models/user.js';

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

    res.json({ users });

}

export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk(
        id,
        {
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


    if (!user) {
        return res.status(404).json({
            msg: `Usuário com ID '${id}' não existe.`
        });
    }

    return res.json({ user });

}

export const postUser = (req: Request, res: Response) => {

    const { body } = req;

    res.json({
        msg: 'postUser',
        body
    })

}

export const putUser = (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: 'putUser',
        id,
        body
    })

}

export const deleteUser = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'deleteUser',
        id
    })

}
