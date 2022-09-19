
import { Response, Request } from "express";
import { getUser, loginUser, registerUser } from "./util";


export async function login(req : Request, res : Response) {
    if(!req.body.username || !req.body.password) return res.json(undefined);

    const cookie = await loginUser(req.body.username, req.body.password);
    if(!cookie) return res.json(undefined);

    res.cookie("sso", cookie, {
        signed: true
    })


    res.json(await getUser(cookie));
}

export async function register(req : Request, res : Response) {
    if(!req.body.username || !req.body.password) return res.json(undefined);

    await registerUser(req.body.username, req.body.password);
    res.json({});
}