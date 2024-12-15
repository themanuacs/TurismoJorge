
import { ChargeDB } from "../config";
import { ChargeInterface } from "../interfaces";

const ChargeServices = {
  getAll: async () => {
    try {
      const Charges = await ChargeDB.findAll({ where: { status: true } });
      if (Charges.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            Charges,
          },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: {
          Charges,
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
      const Charge = await ChargeDB.findOne({
        where: {
          id: id,
          status: true
        }
      });
      if (!Charge) {
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
            Charge,
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
  create: async (data: Partial<ChargeInterface>) => {
    data.name=data.name?.toLowerCase();
    try {
      const Charge = await ChargeDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          Charge,
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
  update: async (id: number|string, dat: Partial<ChargeInterface>) => {
    dat.name=dat.name?.toLowerCase();
    try {
      let Charge: ChargeInterface | any = await ChargeDB.update(dat, { where: { id } });
      const { data } = await ChargeServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          Charge: data?.Charge,
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
      const Charge = await ChargeDB.update(
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
          Charge:null,
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
      const Charge = await ChargeDB.findAll({ where: { name } });
      if (Charge.length===0) {
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
            Charge:Charge[0],
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
  ChargeServices
}


