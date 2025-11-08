import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, ImageOff } from "lucide-react";

interface VariantPreviewCardProps {
  variant: {
    value: string;
    label: string;
    description: string;
  };
  isActive: boolean;
  onSelect: () => void;
  onPreview: () => void;
}

export function VariantPreviewCard({ variant, isActive, onSelect, onPreview }: VariantPreviewCardProps) {
  const [imageError, setImageError] = useState(false);
  const thumbnailUrl = `/assets/layouts/${variant.value}/thumb.webp`;
  const fallbackUrl = `/assets/layouts/${variant.value}/thumb.png`;

  return (
    <Card
      className={`cursor-pointer transition-all hover-elevate ${isActive ? "ring-2 ring-primary" : ""}`}
      onClick={onSelect}
      data-testid={`card-layout-${variant.value}`}
    >
      {/* Thumbnail Preview */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-lg bg-muted">
        {!imageError ? (
          <img
            src={thumbnailUrl}
            alt={`${variant.label} preview`}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              // Try fallback PNG
              const img = e.target as HTMLImageElement;
              if (img.src.endsWith('.webp')) {
                img.src = fallbackUrl;
              } else {
                setImageError(true);
              }
            }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
            <ImageOff className="h-8 w-8" />
            <span className="text-xs">Preview unavailable</span>
          </div>
        )}
        
        {/* Active Badge Overlay */}
        {isActive && (
          <div className="absolute top-2 right-2">
            <Badge variant="default" className="shadow-md">Active</Badge>
          </div>
        )}
      </div>

      {/* Card Content */}
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center justify-between gap-2">
          <span className="line-clamp-1">{variant.label}</span>
        </CardTitle>
        <CardDescription className="text-xs line-clamp-2">
          {variant.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
          data-testid={`button-preview-${variant.value}`}
        >
          <Eye className="h-3 w-3 mr-1" />
          Preview
        </Button>
      </CardContent>
    </Card>
  );
}
