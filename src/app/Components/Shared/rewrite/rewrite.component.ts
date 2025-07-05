import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export type ContentType = 'post' | 'comment' | 'message';
export type ToneType = 'formal' | 'friendly' | 'excited' | 'angry' | 'professional' | 'casual';

@Component({
  selector: 'app-rewrite',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rewrite.component.html',
})
export class RewriteComponent {
  @Input() initialText: string = '';
  @Input() contentType: ContentType = 'post';
  @Input() initialTone: ToneType = 'friendly';
  @Output() rewritten = new EventEmitter<string>();

  text = '';
  type: ContentType = 'post';
  tone: ToneType = 'friendly';
  result: string | null = null;
  isOpen = false;

  constructor(private http: HttpClient) {
    this.text = this.initialText;
    this.type = this.contentType;
    this.tone = this.initialTone;
  }

  openRewrite(text: string) {
    this.text = text;
    this.isOpen = true;
  }

  closeRewrite() {
    this.isOpen = false;
    this.result = null;
  }

  rewrite() {
    const prompt = `Rewrite this ${this.type} in a ${this.tone} tone:\n${this.text} and give me the result without any explanation.`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    });

    const body = {
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    };

    this.http.post<any>('https://api.groq.com/openai/v1/chat/completions', body, { headers })
      .subscribe({
        next: (res) => {
          this.result = res.choices?.[0]?.message?.content?.trim() || '';
          this.rewritten.emit(this.result || '');
        },
        error: (err) => {
          console.error(err);
          this.result = `Error: ${err.message}`;
        }
      });
  }

  useResult() {
    if (this.result) {
      this.rewritten.emit(this.result);
      this.closeRewrite();
    }
  }
} 