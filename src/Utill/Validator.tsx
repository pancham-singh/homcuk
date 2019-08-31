const Joi = require('joi-browser');

const JoiErrorHandler = (errors: any): any => {

    let schemaErrors = {}
    errors.forEach((err: any) => {
        schemaErrors =
            {
                [err.path]:
                err.message
            }
    });
    return schemaErrors;
};


const register = Joi.object().keys({
    firstName: Joi.string().required().error((errors: any) => {
        return {
            message: "First Name is Required"
        };
    }),
    lastName: Joi.string().required().error((errors: any) => {
        return {
            message: "Last Name is Required"
        };
    }),
    emailId: Joi.string().email({minDomainSegments: 2}).error((errors: any) => {
        return {
            message: "Enter Valid Email Address"
        };
    }),
    mobile: Joi.string().required().error((errors: any) => {
        return {
            message: "Mobile is Required"
        };
    }),

    authPassword: Joi.string().min(8).required().error((errors: any) => {
        return {
            message: "Enter Valid Password"
        };
    }),
    isChef: Joi.boolean()
});

const login = Joi.object().keys({
    username: Joi.string().required().error((errors: any) => {
        return {
            message: "Username is Required"
        };
    }),
    password: Joi.string().min(8).required()
});


const profile = Joi.object().keys({
    firstName: Joi.string().required().error((errors: any) => {
        return {
            message: "First Name is Required"
        };
    }),
    lastName: Joi.string().required().error((errors: any) => {
        return {
            message: "Last Name is Required"
        };
    }),
    emailId: Joi.string().email({minDomainSegments: 2}).error((errors: any) => {
        return {
            message: "Enter Valid Email Address"
        };
    }), mobile: Joi.string().required().error((errors: any) => {
        return {
            message: "Mobile is Required"
        };
    }),
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    postalCode: Joi.string(),
});

const dish = Joi.object().keys({
    dishName: Joi.string().required().error((errors: any) => {
        return {
            message: "Dish Name is Required"
        };
    }),
    price: Joi.number().integer().min(1).max(5000).required().error((errors: any) => {
        return {
            message: "Price is Required"
        };
    }),
    serves: Joi.number().integer().min(1).max(5000).required().error((errors: any) => {
        return {
            message: "Serve is Required"
        };
    }),
    description: Joi.string().required().error((errors: any) => {
        return {
            message: "Description is Required"
        };
    }),
    media: Joi.array(),
    cuisines: Joi.array().items(Joi.string()).required().error((errors: any) => {
        return {
            message: "Cuisines Are Required"
        };
    }),

    types: Joi.array().items(Joi.string()).required().error((errors: any) => {
        return {
            message: "Dish Types are Required"
        };
    }),
    isSpeciality: Joi.boolean(),
    availableForPreOrder: Joi.boolean(),
    isDraft: Joi.boolean()
});


const document = Joi.object().keys({
    url: Joi.string().required().error((errors: any) => {
        return {
            message: "Document Image is Required"
        };
    }),
    documentType: Joi.string(),
});

const bank = Joi.object().keys({
    bankName: Joi.string().required().error((errors: any) => {
        return {
            message: "Bank Name is Required"
        };
    }),
    bankAccountNumber: Joi.number().required().error((errors: any) => {
        return {
            message: "Account Number is Required"
        };
    }),
    accountHolderName: Joi.string().required().error((errors: any) => {
        return {
            message: "Holder Name is Required"
        };
    }),
    ifscCode: Joi.string().required().error((errors: any) => {
        return {
            message: "IFSC Number is Required"
        };
    }),
});

interface Login {
    username: string,
    password: string
}

interface Register {
    firstName: string,
    lastName: string,
    mobile: string,
    emailId: string,
    authPassword: string,
    isChef: boolean
}

interface Profile {
    firstName: string,
    lastName: string,
    mobile: string,
    emailId: string,
    address: string,
    city: string,
    state: string,
    postalCode: string
}

interface BankDetails {
    bankName: string,
    bankAccountNumber: number,
    accountHolderName: string,
    ifscCode: string
}

interface Dish {
    dishName: string,
    description: string,
    isSpeciality: boolean
    isDraft: boolean,
    availableForPreOrder: boolean,
    types: string[],
    cuisines: string[],
    media: any[],
    price: number
}

interface Document {
    url: string,
    documentType: string,
}

export interface Media {
    url: string,
    type: string,
    size: string
}
export const ORDER_STATUS = {
    RECEIVED: 'RECEIVED',
    ACCEPTED: 'ACCEPTED',
    CANCELED_BY_CHEF: 'CANCELED_BY_CHEF',
    CANCELED_BY_USER:'CANCELED_BY_USER',
    IN_KITCHEN: 'IN_KITCHEN',
    AWAITING_DELIVERY_BOY: 'AWAITING_DELIVERY_BOY',
    ON_THE_WAY: 'ON_THE_WAY',
    DELIVERED: 'DELIVERED'
};

export default class Validator {
    public registerValidator = (payload: Register): Promise<any> => {
        return new Promise<any>((reject: any, resolve: any) => {
            Joi.validate(payload, register).then((result: any) => {
                return reject(result)
            }).catch((error: any) => {
                const errorObj = JSON.parse(JSON.stringify(error));
                return resolve(JoiErrorHandler(errorObj.details))

            });
        })
    };

    public loginValidator = (payload: Login): Promise<any> => {
        return new Promise<any>((reject: any, resolve: any) => {
            Joi.validate(payload, login).then((result: any) => {
                return reject(result)
            }).catch((error: any) => {
                const errorObj = JSON.parse(JSON.stringify(error));
                return resolve(JoiErrorHandler(errorObj.details))

            });
        })
    };

    public profileValidator = (payload: Profile): Promise<any> => {
        return new Promise<any>((reject: any, resolve: any) => {
            Joi.validate(payload, profile).then((result: any) => {
                return reject(result)
            }).catch((error: any) => {
                const errorObj = JSON.parse(JSON.stringify(error));
                return resolve(JoiErrorHandler(errorObj.details))

            });
        })
    };

    public dishValidator = (payload: Dish): Promise<any> => {
        return new Promise<any>((reject: any, resolve: any) => {
            Joi.validate(payload, dish).then((result: any) => {
                return reject(result)
            }).catch((error: any) => {
                const errorObj = JSON.parse(JSON.stringify(error));
                return resolve(JoiErrorHandler(errorObj.details))

            });
        })
    };

    public documentValidator = (payload: Document): Promise<any> => {
        return new Promise<any>((reject: any, resolve: any) => {
            Joi.validate(payload, document).then((result: any) => {
                return reject(result)
            }).catch((error: any) => {
                const errorObj = JSON.parse(JSON.stringify(error));
                return resolve(JoiErrorHandler(errorObj.details))

            });
        })
    };

    public bankAccountValidator = (payload: BankDetails): Promise<any> => {
        return new Promise<any>((reject: any, resolve: any) => {
            Joi.validate(payload, bank).then((result: any) => {
                return reject(result)
            }).catch((error: any) => {
                const errorObj = JSON.parse(JSON.stringify(error));
                return resolve(JoiErrorHandler(errorObj.details))

            });
        })
    };
}
