interface RequestParams {
    protocol: string;
    host: string;
    token: string;
    user: string;
  }
  
  export function getRequestParams(): RequestParams {
    const protocol: string = window.location.protocol;
    const host: string = window.location.host;
    const tokencookie: any = useCookie("111111");
    const token: string = tokencookie.value;
    const name: any = useCookie("222222");
    const user: string = name.value;
    
    return {
      protocol,
      host,
      token,
      user,
    };
  }
  