import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'

})
export class JogoDaVelhaService {

  private readonly TAM_TAB: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly VAZIO: number = 0;

  private tabuleiro: any;
  private vitoria: any;
  private numMovimentos: number = 0;

  private _jogador: number = 0;
  private _showInicio: boolean= false;
  private _showTabuleiro: boolean = false;
  private _showFinal: boolean = false;

  constructor() { }

  // Inicializa o jogo. Define a exebição da tela inicial

  inicializar(): void {
    this._showInicio = true;
    this._showTabuleiro = false;
    this._showFinal = false;
    this.numMovimentos = 0;
    this._jogador = this.X;
    this.vitoria = false;
    this.inicializarTabuleiro();

  }

  // Incializa o tabuleiro do jogo com vazio para todas as posições

  inicializarTabuleiro(): void {
    this.tabuleiro = [this.TAM_TAB];
    for (let i = 0; i < this.TAM_TAB; i++) {
      this.tabuleiro[i] = [this.VAZIO, this.VAZIO, this.VAZIO];
    }
  }
   // Retorna se a tela de inicio deve ser exibida

  get showInicio(): boolean {
    return this._showInicio
  }

  // Retorna se o tabuleiro deve ser exebido

  get showTabuleiro(): boolean {
    return this._showTabuleiro
  }

  // Retorna se o tabuleiro deve ser exebido

  get showFinal(): boolean {
    return this._showFinal
  }

  // Retorna se os jogadores devem ser exibidos

  get jogador(): number {
    return this._jogador
  }


  iniciarJogo(): void {
    this._showInicio = false;
    this._showTabuleiro = true;
  }
  // Realiza a jogada conforme as coordenadas do tabuleiro

  jogar(posX: number, posY: number): void {
    //jogada invalida
    if (this.tabuleiro[posX][posY] !== this.VAZIO || this.vitoria) {
      return;
    }
    this.tabuleiro[posX][posY] = this._jogador;
    this.numMovimentos++;
    this.vitoria = this.fimJogo(posX, posY,
      this.tabuleiro, this._jogador);
    this._jogador = (this._jogador === this.X) ? this.O : this.X;

    // caso aja vitoria sera exebida na tela de quem venceu
    if (this.vitoria !== false) {
      this._showFinal = true;
    }

    //empate
    if (!this.vitoria && this.numMovimentos === 9) {
      this._jogador = 0;
      this._showFinal = true;
    }
  }
  // verifica se o jogo terminou

  fimJogo(linha: number, coluna: number,
    tabuleiro: any, jogador: number) {
  let fim: any = false;

  // valida a linha
  if (tabuleiro[linha][0] === jogador &&
    tabuleiro[linha][1] === jogador &&
    tabuleiro[linha][2] === jogador) {
    fim = [[linha, 0], [linha, 1], [linha, 2]];
  }

  // valida a coluna
  if (tabuleiro[0][coluna] === jogador &&
    tabuleiro[1][coluna] === jogador &&
    tabuleiro[2][coluna] === jogador) {
    fim = [[0, coluna], [1, coluna], [2, coluna]];
  }

  // valida as diagonais
  if (tabuleiro[0][0] === jogador &&
    tabuleiro[1][1] === jogador &&
    tabuleiro[2][2] === jogador) {
    fim = [[0, 0], [1, 1], [2, 2]];
  }

  if (tabuleiro[0][2] === jogador &&
    tabuleiro[1][1] === jogador &&
    tabuleiro[2][0] === jogador) {
    fim = [[0, 2], [1, 1], [2, 0]];
  }

  return fim;
}
 // Retorna se a peça X deve ser exibida para a coordena informada.

  exibirX(posX: number, posY: number): boolean {
    return this.tabuleiro[posX][posY] === this.X;
  }

  //Retorna se a peça O deve ser exibida para a coordena informada.

  exibirO(posX: number, posY: number): boolean {
    return this.tabuleiro[posX][posY] === this.O;
  }

  // Retorna se a marcação de vitória deve ser exibida para a coordena informada.

  exibirVitoria(posX: number, posY: number): boolean {
    let exibirVitoria: boolean = false;

    if (!this.vitoria) {
      return exibirVitoria;
    }

    for (let pos of this.vitoria) {
      if (pos[0] === posX && pos[1] === posY) {
        exibirVitoria = true;
        break;
      }
    }

    return exibirVitoria;
  }

  // Inicializa um novo jogo, assim como exibe o tabuleiro

  novoJogo(): void {
    this.inicializar();
    this._showFinal = false;
    this._showInicio = false;
    this._showTabuleiro = true;
  }

}

