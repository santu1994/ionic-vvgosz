export interface LoginInfoSchema {
  user_id: string;
  onModel: string;
  role: number;
  location: {
    type: string;
    coordinates: Array<number>;
  };
  ip_address: string;
  device_information: {

    os: string;
    browser: string;
    device: string;
    os_version: string;
    browser_version: string;
    isDesktop: boolean;
    isMobile: boolean,
    isTablet: boolean
  };
  login_type: number;
  is_login: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
