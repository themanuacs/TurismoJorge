
import { DepartamentDB } from "../config";
import { DepartamentInterface } from "../interfaces";

const DepartamentServices = {
  getAll: async () => {
    try {
      const Departaments = await DepartamentDB.findAll({ where: { status: true } });
      if (Departaments.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            Departaments,
          },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: {
          Departaments,
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
      const Departament = await DepartamentDB.findOne({
        where: {
          id: id,
          status: true
        }
      });
      if (!Departament) {
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
            Departament,
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
  create: async (data: Partial<DepartamentInterface>) => {
    data.name=data.name?.toLowerCase();
    try {
      const Departament = await DepartamentDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          Departament,
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
  update: async (id: number|string, dat: Partial<DepartamentInterface>) => {
    dat.name=dat.name?.toLowerCase();
    try {
      let Departament: DepartamentInterface | any = await DepartamentDB.update(dat, { where: { id } });
      const { data } = await DepartamentServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          Departament: data?.Departament,
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
      const Departament = await DepartamentDB.update(
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
          Departament:null,
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
      const Departament = await DepartamentDB.findAll({ where: { name } });
      if (Departament.length===0) {
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
            Departament:Departament[0],
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
  DepartamentServices
}


