class User {
	constructor(
		public token: string,
		public no_funcionario: string,
		public img: string,
		public user: Logado[] = [],
		public me: Logado[] = [],
		public empresa: Empresa[] = [],
		public funcionario: Funcionario[] = []
	) {}
}
class Logado {
	constructor(
		public id: number,
		public login: string,
		public id_pessoa: number,
		public no_funcionario: string
	) {}
}
class Empresa {
	constructor(
		public id: number,
		public no_fantasia: string,
		public nu_cnpj: string,
		public no_razao_social: string,
		public nu_inscricao_estadual: string,
		public nu_inscricao_municipal: string,
		public id_empresa_dados_fiscais: number,
		public img: string
	) {}
}
class Funcionario {
	constructor(
		public id: number,
		public no_funcionario: string,
		public bo_ativo: boolean,
		public tp_funcionario: number,
		public id_empresa: number
	) {}
}

export { User, Logado, Empresa, Funcionario };
