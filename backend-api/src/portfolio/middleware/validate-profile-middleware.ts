import {BadRequestException, HttpStatus, Injectable, NestMiddleware} from "@nestjs/common";
import {PortfolioService} from "../portfolio.service";
import {NextFunction, Request, Response} from "express";


@Injectable()
export class ValidateProfileMiddleware implements NestMiddleware {
    constructor(public readonly portfolioService: PortfolioService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            const portfolio = await this.portfolioService.findOne(id);

            if (portfolio.length == 0) {
                return res
                    .status(HttpStatus.BAD_REQUEST)
                    .json({
                    response: {
                        statusCode: 400,
                        message: `Portfolio with ID ${id} does not exist`,
                        error: "Bad Request"
                    },
                    });
            }

            req.body.portfolio = portfolio;
            next();
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
}