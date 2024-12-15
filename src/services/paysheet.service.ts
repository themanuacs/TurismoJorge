
import { PaysheetDB } from "../config";
import { PaysheetInterface } from "../interfaces";

const PaysheetServices = {
  getAll: async () => {
    try {
      const Paysheets = await PaysheetDB.findAll({ where: { status: true } });
      if (Paysheets.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            Paysheets,
          },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: {
          Paysheets,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  getOne: async (id: number|string) => {
    try {
      const Paysheet = await PaysheetDB.findOne({
        where: {
          id: id,
          status: true
        }
      });
      if (!Paysheet) {
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: {},
        };
      } else {
        return {
          message: `Registro encontrado`,
          status: 200,
          data: {
            Paysheet,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  create: async (data: Partial<PaysheetInterface>) => {
    data.name=data.name?.toLowerCase();
    try {
      const Paysheet = await PaysheetDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          Paysheet,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  update: async (id: number|string, dat: Partial<PaysheetInterface>) => {
    dat.name=dat.name?.toLowerCase();
    try {
      let Paysheet: PaysheetInterface | any = await PaysheetDB.update(dat, { where: { id } });
      const { data } = await PaysheetServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          Paysheet: data?.Paysheet,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  delete: async (id: number) => {
    try {
      const Paysheet = await PaysheetDB.update(
        {
          status: false,
          deletedAt: new Date(),
        },
        { where: { id } }
      );
      return {
        message: `Eliminación exitosa`,
        status: 204,
        data: {
          Paysheet:null,
        },
      };
    } catch (error) {
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  findByName: async (name: string) => {
    try {
      const Paysheet = await PaysheetDB.findAll({ where: { name } });
      if (Paysheet.length===0) {
        console.log("Registro no encontrado")
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: {},
        };
      } else {
        return {
          message: `Service encontrado`,
          status: 200,
          data: {
            Paysheet:Paysheet[0],
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: `Contact the administrator: error`,
        status: 500,
      };
    }
  },
};

export {
  PaysheetServices
}


