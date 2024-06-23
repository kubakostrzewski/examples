import {Request, Response} from "express";
import {planets} from "../../models/panets.model";

export function getAllPlanets(req: Request, res: Response) {

    return res.status(200).json(planets)

}

