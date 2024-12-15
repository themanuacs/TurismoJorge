
import { EmpleoyeeAssistanceDB } from "../config";
import { EmpleoyeeAssistanceInterface } from "../interfaces";

const EmpleoyeeAssistanceServices = {
  getAll: async () => {
    try {
      const categories = await EmpleoyeeAssistanceDB.findAll({ where: { status: true } });
      if (categories.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            categories,
          },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: {
          categories,
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
      const EmpleoyeeAssistance = await EmpleoyeeAssistanceDB.findOne({
        where: {
          id: id,
          status: true
        }
      });
      if (!EmpleoyeeAssistance) {
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
            EmpleoyeeAssistance,
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
  create: async (data: Partial<EmpleoyeeAssistanceInterface>) => {
    data.name=data.name?.toLowerCase();
    try {
      const EmpleoyeeAssistance = await EmpleoyeeAssistanceDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          EmpleoyeeAssistance,
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
  update: async (id: number|string, dat: Partial<EmpleoyeeAssistanceInterface>) => {
    dat.name=dat.name?.toLowerCase();
    try {
      let EmpleoyeeAssistance: EmpleoyeeAssistanceInterface | any = await EmpleoyeeAssistanceDB.update(dat, { where: { id } });
      const { data } = await EmpleoyeeAssistanceServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          EmpleoyeeAssistance: data?.EmpleoyeeAssistance,
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
      const EmpleoyeeAssistance = await EmpleoyeeAssistanceDB.update(
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
          EmpleoyeeAssistance:null,
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
      const EmpleoyeeAssistance = await EmpleoyeeAssistanceDB.findAll({ where: { name } });
      if (EmpleoyeeAssistance.length===0) {
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
            EmpleoyeeAssistance:EmpleoyeeAssistance[0],
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
  EmpleoyeeAssistanceServices
}


