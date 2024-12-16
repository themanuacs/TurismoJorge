
import { ConceptDB } from "../config";
import { ConceptInterface } from "../interfaces";

const ConceptServices = {
  getAll: async () => {
    try {
      const Concepts = await ConceptDB.findAll({ where: { status: true } });
      if (Concepts.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            Concepts,
          },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: {
          Concepts,
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
      const Concept = await ConceptDB.findOne({
        where: {
          id: id,
          status: true
        }
      });
      if (!Concept) {
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
            Concept,
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
  create: async (data: Partial<ConceptInterface>) => {
    data.name=data.name?.toLowerCase();
    try {
      const Concept = await ConceptDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          Concept,
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
  update: async (id: number|string, dat: Partial<ConceptInterface>) => {
    dat.name=dat.name?.toLowerCase();
    try {
      let Concept: ConceptInterface | any = await ConceptDB.update(dat, { where: { id } });
      const { data } = await ConceptServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          Concept: data?.Concept,
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
      const Concept = await ConceptDB.update(
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
          Concept:null,
        },
      };
    } catch (error) {
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  findBytype: async (type: string) => {
    try {
      const Concept = await ConceptDB.findAll({ where: { type } });
      if (Concept.length===0) {
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
            Concept:Concept[0],
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
  ConceptServices
}


