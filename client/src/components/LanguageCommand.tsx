import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useLanguage } from "@/hooks/useLanguage";
import { Language, languageNames, getLanguagesByRegion, LanguageRegion } from "@/translations";
import { Globe, Check } from "lucide-react";

export function LanguageCommand() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const languagesByRegion = getLanguagesByRegion();
  const regionOrder: LanguageRegion[] = ['Popular', 'European', 'Asian', 'Middle Eastern', 'Other'];

  const handleSelect = (selectedLang: Language) => {
    setLanguage(selectedLang);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          data-testid="button-language-switcher"
          className="h-9 w-9"
        >
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle>Select Language</DialogTitle>
          <DialogDescription>
            Choose your preferred language from {Object.keys(languageNames).length} available options
          </DialogDescription>
        </DialogHeader>
        <Command className="rounded-lg border-0">
          <CommandInput placeholder="Search languages..." data-testid="input-search-language" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            {regionOrder.map((region, idx) => {
              const languages = languagesByRegion[region];
              if (!languages || languages.length === 0) return null;

              return (
                <div key={region}>
                  {idx > 0 && <CommandSeparator />}
                  <CommandGroup heading={region}>
                    {languages.map((lang) => (
                      <CommandItem
                        key={lang}
                        value={`${lang}-${languageNames[lang].native}`}
                        onSelect={() => handleSelect(lang)}
                        data-testid={`language-option-${lang}`}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium">{languageNames[lang].native}</span>
                          <span className="text-xs text-muted-foreground">{lang}</span>
                        </div>
                        {language === lang && (
                          <Check className="h-4 w-4 text-primary" data-testid={`check-${lang}`} />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </div>
              );
            })}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
