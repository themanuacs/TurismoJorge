
import { SupervisorDB } from "../config";
import { SupervisorInterface } from "../interfaces";

const SupervisorServices = {
  getAll: async () => {
    try {
      const Supervisors = await SupervisorDB.findAll({ where: { status: true } });
      if (Supervisors.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            Supervisors,
          },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: {
          Supervisors,
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
      const Supervisor = await SupervisorDB.findOne({
        where: {
          id: id,
          status: true
        }
      });
      if (!Supervisor) {
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
            Supervisor,
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
  create: async (data: Partial<SupervisorInterface>) => {
    data.name=data.name?.toLowerCase();
    try {
      const Supervisor = await SupervisorDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          Supervisor,
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
  update: async (id: number|string, dat: Partial<SupervisorInterface>) => {
    dat.name=dat.name?.toLowerCase();
    try {
      let Supervisor: SupervisorInterface | any = await SupervisorDB.update(dat, { where: { id } });
      const { data } = await SupervisorServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          Supervisor: data?.Supervisor,
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
      const Supervisor = await SupervisorDB.update(
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
          Supervisor:null,
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
      const Supervisor = await SupervisorDB.findAll({ where: { name } });
      if (Supervisor.length===0) {
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
            Supervisor:Supervisor[0],
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
  SupervisorServices
}


