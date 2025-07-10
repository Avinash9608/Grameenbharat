'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Mic, FileAudio, AlertCircle, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { handleTranslateFolklore } from '@/app/actions';

const Folklore = () => {
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [localDialect, setLocalDialect] = useState<string>('');
  const [englishTranslation, setEnglishTranslation] = useState<string>('');
  const [englishAudioUri, setEnglishAudioUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAudioDataUri(e.target?.result as string);
        setError(null); // Clear previous errors
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!audioDataUri || !localDialect) {
      setError('Please upload an audio file and select a dialect.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEnglishTranslation('');
    setEnglishAudioUri(null);

    try {
      const result = await handleTranslateFolklore({ audioDataUri, localDialect });
      setEnglishTranslation(result.englishTranslation);
      setEnglishAudioUri(result.audioDataUri);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Translation Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="folklore" className="py-16 md:py-24 bg-background/70">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Elders' Wisdom &amp; Folklore</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Listen to the timeless stories passed down through generations, translated for the world to hear.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg border-primary/20">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                <Mic className="h-8 w-8 text-primary" />
                Translate a Folk Tale
              </CardTitle>
              <CardDescription>
                Upload an audio file of a story told by a village elder and our AI will transcribe and translate it into English.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="audio-file">
                    <FileAudio className="inline-block mr-2 h-4 w-4" />
                    Audio Recording
                  </Label>
                  <Input id="audio-file" type="file" accept="audio/*" onChange={handleFileChange} className="file:text-primary-foreground" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dialect">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2 h-4 w-4"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m12 25 4-9 4.5 9"/><path d="M19.5 22h-5"/></svg>
                    Local Dialect
                  </Label>
                  <Select onValueChange={setLocalDialect} value={localDialect}>
                    <SelectTrigger id="dialect">
                      <SelectValue placeholder="Select a dialect" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bhojpuri">Bhojpuri</SelectItem>
                      <SelectItem value="Haryanvi">Haryanvi</SelectItem>
                      <SelectItem value="Marwari">Marwari</SelectItem>
                      <SelectItem value="Awadhi">Awadhi</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {isLoading && (
                  <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-lg bg-secondary/30">
                     <Loader2 className="h-12 w-12 animate-spin text-primary" />
                     <p className="text-muted-foreground font-semibold">Translating wisdom... this may take a moment.</p>
                  </div>
              )}
              {!isLoading && englishTranslation && (
                <div className="space-y-4 pt-4 border-t">
                    <Label htmlFor="translation-text" className="font-bold text-lg">English Translation</Label>
                    <Textarea id="translation-text" value={englishTranslation} readOnly rows={8} className="bg-background" />
                    {englishAudioUri && (
                        <div className="space-y-2">
                            <Label className="font-bold text-lg flex items-center gap-2"><Volume2/> Listen to the story</Label>
                            <audio controls src={englishAudioUri} className="w-full">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading || !audioDataUri || !localDialect} className="w-full md:w-auto">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Translating...</> : 'Translate Tale'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Folklore;
