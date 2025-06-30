interface RequestParams {
    protocol: string;
    host: string;
    token: string;
    user: string;
    role: string;
  }
  
  export function getRequestParams(): RequestParams {
    const protocol: string = window.location.protocol;
    const host: string = window.location.host;
    const tokencookie: any = useCookie("712162213");
    const token: string = tokencookie.value;
    const crypt: any = useCookie("2492117");
    const user: string = crypt.value;
    const roles: any = useCookie("9121522");
    const role: string = roles.value;
    
    return {
      protocol,
      host,
      token,
      user,
      role
    };
  }
  