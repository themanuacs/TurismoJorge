
import { PaysheetDetailDB } from "../config";
import { PaysheetDetailInterface } from "../interfaces";

const PaysheetDetailServices = {
  getAll: async () => {
    try {
      const PaysheetDetails = await PaysheetDetailDB.findAll({ where: { status: true } });
      if (PaysheetDetails.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            PaysheetDetails,
          },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: {
          PaysheetDetails,
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
      const PaysheetDetail = await PaysheetDetailDB.findOne({
        where: {
          id: id,
          status: true
        }
      });
      if (!PaysheetDetail) {
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
            PaysheetDetail,
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
  create: async (data: Partial<PaysheetDetailInterface>) => {
    data.name=data.name?.toLowerCase();
    try {
      const PaysheetDetail = await PaysheetDetailDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          PaysheetDetail,
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
  update: async (id: number|string, dat: Partial<PaysheetDetailInterface>) => {
    dat.name=dat.name?.toLowerCase();
    try {
      let PaysheetDetail: PaysheetDetailInterface | any = await PaysheetDetailDB.update(dat, { where: { id } });
      const { data } = await PaysheetDetailServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          PaysheetDetail: data?.PaysheetDetail,
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
      const PaysheetDetail = await PaysheetDetailDB.update(
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
          PaysheetDetail:null,
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
      const PaysheetDetail = await PaysheetDetailDB.findAll({ where: { name } });
      if (PaysheetDetail.length===0) {
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
            PaysheetDetail:PaysheetDetail[0],
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
  PaysheetDetailServices
}


