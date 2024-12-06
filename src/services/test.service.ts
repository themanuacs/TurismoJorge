import { TestInterface } from "../interfaces";

const testServices = {
  getAll: async () => {
    try {
      const response = await fetch("http://localhost:3000/backends");
      const backends = await response.json();
      return {
        message: `Registros encontrados desde JSON Server exitosa`,
        status: 200,
        data: {
          backends,
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
  create: async (data: Partial<TestInterface>) => {
    try {
      const response = await fetch("http://localhost:3000/backends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const backend = await response.json();

      return {
        message: `Creación desde JSON Server exitosa`,
        status: 201,
        data: {
          backend,
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
  update: async (id:string,data: Partial<TestInterface>) => {
    try {
      const response = await fetch(`http://localhost:3000/backends/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const backend = await response.json();

      return {
        message: `Actualizacion desde JSON Server exitosa`,
        status: 201,
        data: {
          backend,
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
};

export { testServices };
