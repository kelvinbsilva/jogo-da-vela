import { Component, OnInit } from '@angular/core';
import {JogoDaVelhaService} from './shared'

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.scss']
})
export class JogoDaVelhaComponent implements OnInit {

  constructor(private JogoDaVelhaService: JogoDaVelhaService) { }

  ngOnInit(): void {
    this.JogoDaVelhaService.inicializar()
  }

  get showInicio(): boolean {
    return this.JogoDaVelhaService.showInicio;
  }

  get showTabuleiro(): boolean {
    return this.JogoDaVelhaService.showTabuleiro;
  }

  get showFinal(): boolean {
    return this.JogoDaVelhaService.showFinal;
  }

  iniciarJogo(): void {
    this.JogoDaVelhaService.iniciarJogo();
  }

  jogar(posX: number, posY: number): void {
    this.JogoDaVelhaService.jogar(posX, posY);
  }

  exibirX(posX:number, posY: number): boolean {
    return this.JogoDaVelhaService.exibirX(posX, posY)
  }

  exibirO(posX:number, posY: number): boolean {
    return this.JogoDaVelhaService.exibirO(posX, posY)
  }

  exibirVitoria(posX:number, posY: number): boolean {
    return this.JogoDaVelhaService.exibirVitoria(posX, posY)
  }

  get jogador(): number {
    return this.JogoDaVelhaService.jogador;
  }

  novoJogo(): void {
    this.JogoDaVelhaService.novoJogo();
  }

}
