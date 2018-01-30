const Chelmer = {
	baseUrl: "http://chm-qa33-css.chelmer.co.nz:8080/webservice/rest",
	login: "/security/login",
	sessionValidate: "/security/validate/sessions/",
	holdings: "/api/v1/aggregation/portfolio/holdings"
}

const Portfolios = [
	{name: "Ms Sherry Wang", portfolio: 990046340},
	{name: "Mr Michael Smith", portfolio: 990041720},
	{name: "Mr William Boggs", portfolio: 990011110},
	{name: "William & Nina Boggs", portfolio: 990026967}
	
  ];

const Palette = ['#3995e0', '#5ab6cd', '#5bcdac', '#5ec542', '#8dc641'];
	
const GreenShades = ['#B2CFCC', '#A9C9C6', '#94C3C0', '#96BEBA', '#89ADAA', '#7B9C99', '#6E8B88', '#607977', '#526866'];

export { Chelmer, Portfolios, Palette, GreenShades };