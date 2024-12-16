
import { EmpleoyeeUserDB } from "../config";
import { EmpleoyeeUserInterface } from "../interfaces";

const EmpleoyeeUserServices = {
  getAll: async () => {
    try {
      const EmpleoyeeUsers = await EmpleoyeeUserDB.findAll({ where: { status: true } });
      if (EmpleoyeeUsers.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            EmpleoyeeUsers,
          },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: {
          EmpleoyeeUsers,
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
      const EmpleoyeeUser = await EmpleoyeeUserDB.findOne({
        where: {
          id: id,
          status: true
        }
      });
      if (!EmpleoyeeUser) {
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
            EmpleoyeeUser,
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
  create: async (data: Partial<EmpleoyeeUserInterface>) => {
    data.name=data.name?.toLowerCase();
    try {
      const EmpleoyeeUser = await EmpleoyeeUserDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          EmpleoyeeUser,
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
  update: async (id: number|string, dat: Partial<EmpleoyeeUserInterface>) => {
    dat.name=dat.name?.toLowerCase();
    try {
      let EmpleoyeeUser: EmpleoyeeUserInterface | any = await EmpleoyeeUserDB.update(dat, { where: { id } });
      const { data } = await EmpleoyeeUserServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          EmpleoyeeUser: data?.EmpleoyeeUser,
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
      const EmpleoyeeUser = await EmpleoyeeUserDB.update(
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
          EmpleoyeeUser:null,
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
      const EmpleoyeeUser = await EmpleoyeeUserDB.findAll({ where: { name } });
      if (EmpleoyeeUser.length===0) {
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
            EmpleoyeeUser:EmpleoyeeUser[0],
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
  EmpleoyeeUserServices
}


