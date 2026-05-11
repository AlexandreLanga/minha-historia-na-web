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
      content: '<p><strong>Angular</strong> é um framework para desenvolvimento de aplicações web. Ele permite criar aplicações dinâmicas e interativas usando <em>TypeScript</em>.</p><p>Com Angular, você pode construir SPAs (Single Page Applications) de forma eficiente, utilizando componentes reutilizáveis e um sistema de injeção de dependências robusto. O framework oferece ferramentas poderosas para roteamento, gerenciamento de estado e integração com APIs.</p>',
      date: new Date('2023-01-01')
    },
    {
      title: 'TypeScript Básico',
      content: '<p><strong>TypeScript</strong> é um superset do JavaScript que adiciona tipagem estática opcional.</p><p>Ele ajuda a detectar erros em tempo de desenvolvimento e melhora a manutenção do código. Com TypeScript, você pode definir <code>interfaces</code>, tipos e enums, tornando o código mais legível e menos propenso a bugs.</p><p>É amplamente usado em projetos Angular e Node.js.</p>',
      date: new Date('2023-02-01')
    },
    {
      title: 'Desenvolvimento com Node.js',
      content: '<p><strong>Node.js</strong> é um ambiente de execução JavaScript do lado do servidor.</p><p>Ele permite executar JavaScript fora do navegador, facilitando a criação de APIs e aplicações backend. Com o NPM (Node Package Manager), você tem acesso a milhares de bibliotecas.</p><p>É ideal para aplicações em tempo real, como chats e jogos online.</p>',
      date: new Date('2023-03-01')
    },
    {
      title: 'Bancos de Dados SQL',
      content: '<p><strong>SQL</strong> é uma linguagem para gerenciar bancos de dados relacionais.</p><p>Comandos como <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code> e <code>DELETE</code> permitem consultar e manipular dados.</p><p>Bancos como PostgreSQL, MySQL e SQL Server são populares. Entender normalização e índices é crucial para performance.</p>',
      date: new Date('2023-04-01')
    },
    {
      title: 'Versionamento com Git',
      content: '<p><strong>Git</strong> é um sistema de controle de versão distribuído.</p><p>Ele permite rastrear mudanças no código e colaborar em equipe. Comandos básicos incluem <code>git init</code>, <code>git add</code>, <code>git commit</code> e <code>git push</code>.</p><p>Plataformas como GitHub facilitam o compartilhamento e revisão de código.</p>',
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