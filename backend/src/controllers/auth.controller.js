import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../database/database.js';

import {sendMail} from '../helpers/mail.js'

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userQuery = await db.query('SELECT * FROM "user" WHERE email = $1', [username]);
        const user = userQuery.rows[0];


        if (!user) {
            return res.status(404).json({ err: 'Usuario inexistente' });
        }

        const son_iguales = await bcrypt.compare(password, user.password);
        if (!son_iguales) {
            return res.status(400).json({ err: 'Contraseña incorrecta' });
        }

        const una_hora = Math.floor(new Date() / 1000) + 3600;
        const token = jwt.sign({
            exp: una_hora,
            data: {
                id: user.id,
                email: user.email,
                username: user.username,
            }
        }, process.env.SECRET_KEY);


        sendMail(user.email)

        res.json({
            token: token,
            username: user.username,
        });

    } catch (error) {
        return res.status(500).json({ err: 'Error en el servidor', type: error });
    }
};

export const signup = async (req, res) => {
    const { username, email, password } = req.body.params;

    try {
        const existingUserQuery = await db.query('SELECT * FROM "user" WHERE email = $1', [email]);
        const existingUser = existingUserQuery.rows[0];

        if (existingUser) {
            return res.status(400).json({ err: 'Ese email ya se encuentra registrado' });
        }

        const password_encrypt = await bcrypt.hash(password, 10);
        const newUserQuery = await db.query(
            'INSERT INTO "user" (username, email, password, created_on) VALUES ($1, $2, $3, NOW()) RETURNING id',
            [username, email, password_encrypt]
        );

        const newUser = newUserQuery.rows[0];

        const una_hora = Math.floor(new Date() / 1000) + 3600;
        const token = jwt.sign({
            exp: una_hora,
            data: {
                id: newUser.id,
                email,
                username,
            }
        }, process.env.SECRET_KEY);

        sendMail(email)

        res.json({
            token: token,
            username: username,
        });

    } catch (error) {
        return res.status(500).json({ err: 'Error en el servidor', type: error });
    }
};