import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface Post {
  title: string;
  content: string;
  date: Date;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css'],
})
export class Blog {
  selectedPost: Post | null = null;

  posts: Post[] = [
    {
      title: 'Introdução ao Angular',
      content: 'Angular é um framework para desenvolvimento de aplicações web. Ele permite criar aplicações dinâmicas e interativas usando TypeScript. Com Angular, você pode construir SPAs (Single Page Applications) de forma eficiente, utilizando componentes reutilizáveis e um sistema de injeção de dependências robusto. O framework oferece ferramentas poderosas para roteamento, gerenciamento de estado e integração com APIs.',
      date: new Date('2023-01-01')
    },
    {
      title: 'TypeScript Básico',
      content: 'TypeScript é um superset do JavaScript que adiciona tipagem estática opcional. Ele ajuda a detectar erros em tempo de desenvolvimento e melhora a manutenção do código. Com TypeScript, você pode definir interfaces, tipos e enums, tornando o código mais legível e menos propenso a bugs. É amplamente usado em projetos Angular e Node.js.',
      date: new Date('2023-02-01')
    },
    {
      title: 'Desenvolvimento com Node.js',
      content: 'Node.js é um ambiente de execução JavaScript do lado do servidor. Ele permite executar JavaScript fora do navegador, facilitando a criação de APIs e aplicações backend. Com o NPM (Node Package Manager), você tem acesso a milhares de bibliotecas. É ideal para aplicações em tempo real, como chats e jogos online.',
      date: new Date('2023-03-01')
    },
    {
      title: 'Bancos de Dados SQL',
      content: 'SQL é uma linguagem para gerenciar bancos de dados relacionais. Comandos como SELECT, INSERT, UPDATE e DELETE permitem consultar e manipular dados. Bancos como PostgreSQL, MySQL e SQL Server são populares. Entender normalização e índices é crucial para performance.',
      date: new Date('2023-04-01')
    },
    {
      title: 'Versionamento com Git',
      content: 'Git é um sistema de controle de versão distribuído. Ele permite rastrear mudanças no código e colaborar em equipe. Comandos básicos incluem git init, git add, git commit e git push. Plataformas como GitHub facilitam o compartilhamento e revisão de código.',
      date: new Date('2023-05-01')
    }
  ];

  selectPost(post: Post) {
    this.selectedPost = post;
  }

  backToList() {
    this.selectedPost = null;
  }
}