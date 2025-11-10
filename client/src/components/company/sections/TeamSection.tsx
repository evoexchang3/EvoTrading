import { useLanguage } from "@/contexts/LanguageContext";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TeamSection({ spotlight = false }: { spotlight?: boolean }) {
  const { t } = useLanguage();

  const team = [
    {
      name: t('company.team.member1.name'),
      role: t('company.team.member1.role'),
      bio: t('company.team.member1.bio'),
      initials: "JD",
    },
    {
      name: t('company.team.member2.name'),
      role: t('company.team.member2.role'),
      bio: t('company.team.member2.bio'),
      initials: "SM",
    },
    {
      name: t('company.team.member3.name'),
      role: t('company.team.member3.role'),
      bio: t('company.team.member3.bio'),
      initials: "RC",
    },
    {
      name: t('company.team.member4.name'),
      role: t('company.team.member4.role'),
      bio: t('company.team.member4.bio'),
      initials: "EK",
    },
  ];

  if (spotlight) {
    const featured = team[0];
    const others = team.slice(1);

    return (
      <section className="py-16" aria-label="Leadership team">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-primary" aria-hidden="true" />
            <h2 className="text-3xl font-bold mb-4" data-testid="heading-team">
              {t('company.team.title')}
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-team-description">
              {t('company.team.subtitle')}
            </p>
          </div>

          {/* Featured Leader */}
          <Card className="max-w-3xl mx-auto mb-12" data-testid="featured-leader">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <Avatar className="w-32 h-32">
                  <AvatarFallback className="text-3xl">{featured.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2" data-testid="featured-leader-name">
                    {featured.name}
                  </h3>
                  <p className="text-primary font-semibold mb-4" data-testid="featured-leader-role">
                    {featured.role}
                  </p>
                  <p className="text-muted-foreground" data-testid="featured-leader-bio">
                    {featured.bio}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other Team Members */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {others.map((member, index) => (
              <Card key={index} data-testid={`team-member-${index + 1}`}>
                <CardHeader className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarFallback className="text-xl">{member.initials}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg" data-testid={`team-member-name-${index + 1}`}>
                    {member.name}
                  </CardTitle>
                  <p className="text-sm text-primary" data-testid={`team-member-role-${index + 1}`}>
                    {member.role}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center" data-testid={`team-member-bio-${index + 1}`}>
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/20" aria-label="Leadership team">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Users className="w-12 h-12 mx-auto mb-4 text-primary" aria-hidden="true" />
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-team">
            {t('company.team.title')}
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-team-description">
            {t('company.team.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <Card key={index} className="text-center" data-testid={`team-member-${index}`}>
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">{member.initials}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg" data-testid={`team-member-name-${index}`}>
                  {member.name}
                </CardTitle>
                <p className="text-sm text-primary" data-testid={`team-member-role-${index}`}>
                  {member.role}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground" data-testid={`team-member-bio-${index}`}>
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
