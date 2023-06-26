import Router from "koa-router";

const router = new Router();

router.get('/suma/:n1/:n2', (ctx) => {

    try {
        const numero1 = Number(ctx.params.n1);
        const numero2 = Number(ctx.params.n2);

        if (isNaN(numero1) || isNaN(numero2)) {
            throw new Error("Ingresa numeros");
        }

        const suma = numero1 + numero2
        const response = {
            status: "succes",
            resultado: suma
          };
        ctx.body = response;
    } catch (error) {
        const response = {
            status: "error",
            resultado: error.message
          };
        ctx.body = response;
    }

});

router.get('/mult/:n1/:n2', (ctx) => {

    try {
        const numero1 = Number(ctx.params.n1);
        const numero2 = Number(ctx.params.n2);

        if (isNaN(numero1) || isNaN(numero2)) {
            throw new Error("Ingresa numeros");
        }

        const mult = numero1 * numero2
        const response = {
            status: "succes",
            resultado: mult
          };
        ctx.body = response;
    } catch (error) {
        const response = {
            status: "error",
            resultado: error.message
          };
        ctx.body = response;
    }
});

router.post('/resta', (ctx) => {

    try {
        const json = ctx.request.body;
        const numero1 = Number(json.numero1);
        const numero2 = Number(json.numero2);

        if (isNaN(numero1) || isNaN(numero2)) {
            throw new Error("Ingresa numeros");
        }
        const resta = numero1 - numero2
        const response = {
            status: "success",
            resultado: resta
          };
        ctx.body = response;
    } catch (error) {
        const response = {
            status: "error",
            resultado: error.message
          };
        ctx.body = response;
    }
});


router.post('/div', (ctx) => {

    try {
        const json = ctx.request.body;
        const numero1 = Number(json.numero1);
        const numero2 = Number(json.numero2);

        if (isNaN(numero1) || isNaN(numero2)) {
            throw new Error("Ingresa numeros");
        }
        if (numero2 === 0) {
            throw new Error("division por 0")
        }
        const div = numero1 / numero2
        const response = {
            status: "succes",
            resultado: div
          };
        ctx.body = response;

    } catch (error) {
        const response = {
            status: "error",
            resultado: error.message
          };
        ctx.body = response;
    }
});

export default router;