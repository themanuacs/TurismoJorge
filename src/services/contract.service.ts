
import { ContractDB } from "../config";
import { ContractInterface } from "../interfaces";

const ContractServices = {
  getAll: async () => {
    try {
      const Contracts = await ContractDB.findAll({ where: { status: true } });
      if (Contracts.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            Contracts,
          },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: {
          Contracts,
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
      const Contract = await ContractDB.findOne({
        where: {
          id: id,
          status: true
        }
      });
      if (!Contract) {
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
            Contract,
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
  create: async (data: Partial<ContractInterface>) => {
    data.name=data.name?.toLowerCase();
    try {
      const Contract = await ContractDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          Contract,
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
  update: async (id: number|string, dat: Partial<ContractInterface>) => {
    dat.name=dat.name?.toLowerCase();
    try {
      let Contract: ContractInterface | any = await ContractDB.update(dat, { where: { id } });
      const { data } = await ContractServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          Contract: data?.Contract,
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
      const Contract = await ContractDB.update(
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
          Contract:null,
        },
      };
    } catch (error) {
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  findByname: async (name: string) => {
    try {
      const Contract = await ContractDB.findAll({ where: { name } });
      if (Contract.length===0) {
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
            Contract:Contract[0],
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
  ContractServices
}


