// Classe ErrorLaunch, que extende a classe Error padrão do JavaScript
export default class ErrorLaunch extends Error {
  public code: number; // Propriedade 'code' que armazena o código de erro

  constructor(message: string, code: number) {
    super(message); // Chama o construtor da classe Error, passando a mensagem de erro
    this.code = code; // Define o valor da propriedade 'code' com o código de erro recebido
    Object.setPrototypeOf(this, ErrorLaunch.prototype);
  }
}
// Exporta a classe ErrorLaunch para ser utilizada em outros módulos
