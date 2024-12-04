
import { CategoryDB } from "../config";
import { CategoryInterface } from "../interfaces";

const categoryServices = {
  getAll: async () => {
    try {
      const categories = await CategoryDB.findAll({ where: { status: true } });
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
      const category = await CategoryDB.findOne({
        where: {
          id: id,
          status: true
        }
      });
      if (!category) {
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
            category,
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
  create: async (data: Partial<CategoryInterface>) => {
    data.name=data.name?.toLowerCase();
    try {
      const category = await CategoryDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          category,
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
  update: async (id: number|string, dat: Partial<CategoryInterface>) => {
    dat.name=dat.name?.toLowerCase();
    try {
      let category: CategoryInterface | any = await CategoryDB.update(dat, { where: { id } });
      const { data } = await categoryServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          category: data?.category,
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
      const category = await CategoryDB.update(
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
          category:null,
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
      const category = await CategoryDB.findAll({ where: { name } });
      if (category.length===0) {
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
            category:category[0],
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
  categoryServices
}


