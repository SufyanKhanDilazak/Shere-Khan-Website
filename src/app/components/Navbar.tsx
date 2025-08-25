'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Menu, Sparkles } from 'lucide-react';

const NAVIGATION_LINKS = [
  { name: 'ABOUT US', href: '/about' },
  { name: 'CONTACT', href: '/contact' },
] as const;

export function Header() {
  const pathname = usePathname();
  const [isMenuSheetOpen, setIsMenuSheetOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  useEffect(() => setIsMenuSheetOpen(false), [pathname]);

  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  if (!isMounted) return null;

  return (
    <>
      <style jsx global>{`
        :root {
          --orange: #f15a24;
          --orange-2: #ff7a45;
          --glass: rgba(241, 90, 36, 0.25);
        }
        .glass-header {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.96) 0%,
            rgba(10, 10, 10, 0.92) 50%,
            rgba(0, 0, 0, 0.98) 100%
          );
          backdrop-filter: blur(28px) saturate(170%);
          border-bottom: 1px solid var(--glass);
        }
        .orange-line {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(241, 90, 36, 0.35),
            var(--orange),
            rgba(241, 90, 36, 0.35),
            transparent
          );
        }
        .nav-link {
          position: relative;
          color: #fff;
          transition: color 0.25s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, var(--orange), var(--orange-2));
          transition: width 0.25s ease;
        }
        .nav-link:hover {
          color: var(--orange);
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .menu-sheet {
          background:
            radial-gradient(120% 80% at -10% -10%, rgba(241, 90, 36, 0.2), transparent 60%),
            radial-gradient(80% 60% at 110% 0%, rgba(255, 122, 69, 0.18), transparent 62%),
            #0a0a0a;
          color: #fff;
          border-right: 1px solid rgba(241, 90, 36, 0.22);
        }
        .menu-link {
          display: block;
          padding: 0.75rem 0;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .glass-button {
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid var(--glass);
          color: #fff;
        }
      `}</style>

      <header className="fixed top-0 left-0 w-full z-50 h-20">
        <div className="glass-header h-full relative">
          <div className="absolute top-0 left-0 w-full orange-line" />

          <div className="container mx-auto max-w-7xl px-6 h-full flex items-center justify-between">
            {/* Mobile menu */}
            <div className="flex items-center lg:hidden">
              <Sheet open={isMenuSheetOpen} onOpenChange={setIsMenuSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="glass-button h-10 w-10 rounded-xl"
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="menu-sheet w-[86vw] max-w-[360px] p-0"
                  aria-describedby={undefined}
                >
                  <div className="h-full flex flex-col">
                    <div className="p-5">
                      <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg border border-[rgba(241,90,36,.3)] bg-[rgba(241,90,36,.12)]">
                          <Sparkles className="h-5 w-5 text-[var(--orange)]" />
                        </span>
                        <SheetTitle className="text-white text-lg font-extrabold tracking-[.12em]">
                          MENU
                        </SheetTitle>
                      </div>
                    </div>

                    <nav className="flex-1 overflow-auto px-6 pb-6">
                      <ul className="space-y-2">
                        <li>
                          <SheetClose asChild>
                            <Link
                              href="/"
                              className={`menu-link nav-link ${isActive('/') ? 'text-[var(--orange)]' : ''}`}
                            >
                              HOME
                            </Link>
                          </SheetClose>
                        </li>
                        <li>
                          <SheetClose asChild>
                            <Link
                              href="/order"
                              className={`menu-link nav-link ${isActive('/order') ? 'text-[var(--orange)]' : ''}`}
                            >
                              ORDER NOW
                            </Link>
                          </SheetClose>
                        </li>
                        {NAVIGATION_LINKS.map((link) => (
                          <li key={link.href}>
                            <SheetClose asChild>
                              <Link
                                href={link.href}
                                className={`menu-link nav-link ${isActive(link.href) ? 'text-[var(--orange)]' : ''}`}
                              >
                                {link.name}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo center */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href="/" aria-label="Shere Khan Kitchen" className="block group">
                <div className="relative h-14 w-14">
                  <Image src="/logo.png" alt="Shere Khan Kitchen" fill className="object-contain" priority />
                </div>
              </Link>
            </div>

            {/* Desktop left nav */}
            <div className="hidden lg:flex items-center gap-10">
              <Link
                href="/"
                className={`nav-link text-sm font-bold tracking-wider ${isActive('/') ? 'text-[var(--orange)]' : ''}`}
              >
                HOME
              </Link>
              <Link
                href="/order"
                className={`nav-link text-sm font-bold tracking-wider ${isActive('/order') ? 'text-[var(--orange)]' : ''}`}
              >
                ORDER NOW
              </Link>
            </div>

            {/* Desktop right nav */}
            <div className="hidden lg:flex items-center gap-10 ml-auto mr-6">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-sm font-bold tracking-wider ${isActive(link.href) ? 'text-[var(--orange)]' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full orange-line" />
        </div>
      </header>
    </>
  );
}
