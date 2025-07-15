import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';


export type ContentType = 'post' | 'comment' | 'message';
export type ToneType = 'formal' | 'friendly' | 'excited' | 'angry' | 'professional' | 'casual';

interface RewriteResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class RewriteAiService {
  private readonly apiUrl = environment.aiUrl;
  private readonly apiKey = environment.aiKey;
  private readonly model = environment.model;

  constructor(private http: HttpClient) { }

  rewrite(text: string, type: ContentType, tone: ToneType): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'X-Skip-Interceptor': 'true'  // Add this header to skip the interceptor
    });

    const prompt = `Rewrite this ${type} in a ${tone} tone:\n${text} and give me the result without any explanation and return just the rewritten message without even quotations and keep the provided language.`;

    const body = {
      model: this.model,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    };
    console.log('Request body:', this.apiKey);
    return new Observable(observer => {
      this.http.post<RewriteResponse>(this.apiUrl, body, { headers })
        .subscribe({
          next: (response) => {
            const rewrittenText = response.choices?.[0]?.message?.content?.trim() || '';
            observer.next(rewrittenText);
            observer.complete();

          },
          error: (error) => {
            observer.error(error);
          }
        });
    });
  }
}
