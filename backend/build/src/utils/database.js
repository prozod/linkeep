"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
function default_1() {
    const prisma = new client_1.PrismaClient();
    function prismaQueries() {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield prisma.user.findMany();
            console.log(allUsers);
        });
    }
    prismaQueries()
        .catch((e) => {
        throw new Error(e);
    })
        .finally(() => __awaiter(this, void 0, void 0, function* () {
        yield prisma.$disconnect();
    }));
    return prisma;
}
exports.default = default_1;
