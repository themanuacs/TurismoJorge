
import { PerformanceEvaluationDB } from "../config";
import { PerformanceEvaluationInterface } from "../interfaces";

const PerformanceEvaluationServices = {
  getAll: async () => {
    try {
      const PerformanceEvaluations = await PerformanceEvaluationDB.findAll({ where: { status: true } });
      if (PerformanceEvaluations.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            PerformanceEvaluations,
          },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: {
          PerformanceEvaluations,
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
      const PerformanceEvaluation = await PerformanceEvaluationDB.findOne({
        where: {
          id: id,
          status: true
        }
      });
      if (!PerformanceEvaluation) {
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
            PerformanceEvaluation,
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
  create: async (data: Partial<PerformanceEvaluationInterface>) => {
    data.name=data.name?.toLowerCase();
    try {
      const PerformanceEvaluation = await PerformanceEvaluationDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          PerformanceEvaluation,
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
  update: async (id: number|string, dat: Partial<PerformanceEvaluationInterface>) => {
    dat.name=dat.name?.toLowerCase();
    try {
      let PerformanceEvaluation: PerformanceEvaluationInterface | any = await PerformanceEvaluationDB.update(dat, { where: { id } });
      const { data } = await PerformanceEvaluationServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          PerformanceEvaluation: data?.PerformanceEvaluation,
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
      const PerformanceEvaluation = await PerformanceEvaluationDB.update(
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
          PerformanceEvaluation:null,
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
      const PerformanceEvaluation = await PerformanceEvaluationDB.findAll({ where: { name } });
      if (PerformanceEvaluation.length===0) {
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
            PerformanceEvaluation:PerformanceEvaluation[0],
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
  PerformanceEvaluationServices
}


