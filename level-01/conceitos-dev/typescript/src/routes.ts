import { Request, Response } from 'express';
import createUser from './services/Createuser';

export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        email: 'cintiazago@gmail.com',
        password: '123',
        tech: [
            'React',
            { title: 'Javascript', experience: 100}
        ]
    });

    return response.json({ message: 'Hello world!'});
}