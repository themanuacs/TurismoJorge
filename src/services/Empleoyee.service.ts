
import { EmpleoyeeDB } from "../config";
import { EmpleoyeeInterface } from "../interfaces";

const EmpleoyeeServices = {
  getAll: async () => {
    try {
      const empleoyees = await EmpleoyeeDB.findAll({ where: { status: true } });
      if (empleoyees.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            empleoyees,
          },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: {
          empleoyees,
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
      const Empleoyee = await EmpleoyeeDB.findOne({
        where: {
          id: id,
          status: true
        }
      });
      if (!Empleoyee) {
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
            Empleoyee,
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
  create: async (data: Partial<EmpleoyeeInterface>) => {
    data.name=data.name?.toLowerCase();
    try {
      const Empleoyee = await EmpleoyeeDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          Empleoyee,
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
  update: async (id: number|string, dat: Partial<EmpleoyeeInterface>) => {
    dat.name=dat.name?.toLowerCase();
    try {
      let Empleoyee: EmpleoyeeInterface | any = await EmpleoyeeDB.update(dat, { where: { id } });
      const { data } = await EmpleoyeeServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          Empleoyee: data?.Empleoyee,
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
      const Empleoyee = await EmpleoyeeDB.update(
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
          Empleoyee:null,
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
      const Empleoyee = await EmpleoyeeDB.findAll({ where: { name } });
      if (Empleoyee.length===0) {
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
            Empleoyee:Empleoyee[0],
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
  EmpleoyeeServices
}


