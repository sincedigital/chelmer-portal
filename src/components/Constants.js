const Chelmer = {
	baseUrl: "http://chm-qa33-css.chelmer.co.nz/webservice/rest",
	login: "/security/login",
	sessionValidate: "/security/validate/sessions/",
	holdings: "/api/v1/aggregation/portfolio/holdings",
	transactions: "/api/v1/aggregation/transactions",
	performance: "/api/v1/reporting/performance/PRReturnByAsset",
	portfolios: "/api/v1/client/portfolio"
}
 
/*
const Portfolios = [
	{name: "Mr Michael Smith", portfolio: 990041720},
	{name: "Mr Unknown Unknown", portfolio: 30987},
	{name: "Ms Sherry Wang", portfolio: 990046340},
	{name: "Mr William Boggs", portfolio: 990011110},
	{name: "William & Nina Boggs", portfolio: 990026967}
	
  ];
*/

//const Palette = ['#3995e0', '#5ab6cd', '#5bcdac', '#5ec542', '#8dc641', '#9539e0'];
//HWP const Palette = ['#7cb3ac', '#58595b', '#a45d5d', '#5da470', '#a47b5d', '#8dc641'];
const Palette = ['#385e9d', '#1e373c', '#87ca87', '#48233c', '#639fab', '#182944', '#639fab'];	
const GreenShades = ['#B2CFCC', '#A9C9C6', '#94C3C0', '#96BEBA', '#89ADAA', '#7B9C99', '#6E8B88', '#607977', '#526866'];

const Markets = {
		"NZFI":	"New Zealand Fixed Interest",
		"Unlisted":	"Cash",
		"NZSE":	"New Zealand Equities",
		"ASX":	"Australian Equities",
		"AUUT":	"Australian Unit Trusts",
		"NZUT":	"New Zealand Unit Trusts",
		"NYSE": "US Equities",
		"LSE": "UK Equities"
}

export { Chelmer, Palette, GreenShades, Markets };