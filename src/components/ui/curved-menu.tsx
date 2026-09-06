"use client";
import React, {useState, useRef} from "react";

import {motion, useMotionValue, AnimatePresence} from "framer-motion";
import {Link} from "@/i18n/navigation";
import { Languages, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { useLanguageSwitch } from "@/components/layout/language-switcher";
import { siteConfig, mailLink, whatsappLink } from "@/config/site";

/**
 * Dahili yol. Tipi `Link`ten turetiliyor ki `routing.ts` icindeki
 * yollar degistiginde burasi da derlemede uyarsin.
 */
type LocalizedHref = React.ComponentProps<typeof Link>["href"];

interface iNavItem {
	heading: string;
	href?: LocalizedHref;
	subheading?: string;
	imgSrc?: string;
}

interface iNavLinkProps extends iNavItem {
	setIsActive: (isActive: boolean) => void;
	/** Verilmezse satir numarasiz cizilir (sosyal baglantilar, dil) */
	index?: number;
	/** Satirin sagindaki simge */
	icon?: React.ReactNode;
	/**
	 * Dis baglanti veya mailto. Dile gore cevrilmedigi ve istemci
	 * yonlendirmesine girmedigi icin dahili `href`ten ayri tutuluyor.
	 */
	externalHref?: string;
	/** Baglanti yerine eylem calistiran satirlar icin (dil degistirme) */
	onClick?: () => void;
	/**
	 * Basligin dili. CSS `uppercase` buyuk harfe cevirirken ogenin dilini
	 * kullanir; sayfa `lang="tr"` oldugu icin "English" -> "ENGLİSH" oluyordu.
	 */
	lang?: string;
}

interface iCurvedNavbarProps {
	setIsActive: (isActive: boolean) => void;
	navItems: iNavItem[];
	menuLabel?: string;
}

interface iHeaderProps {
	navItems?: iNavItem[];
	menuLabel?: string;
	footer?: React.ReactNode;
}

const MENU_SLIDE_ANIMATION: any = {
	initial: {x: "calc(100% + 100px)"},
	enter: {x: "0", transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]}},
	exit: {
		x: "calc(100% + 100px)",
		transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]},
	},
};

const defaultNavItems: iNavItem[] = [
	{
		heading: "Ana Sayfa",
		href: "/",
		subheading: "Web sitemize hoşgeldiniz",
		imgSrc: "/images/home.jpg",
	},
	{
		heading: "Hakkımızda",
		href: "/hakkimizda",
		subheading: "Biz kimiz?",
		imgSrc: "/images/about.jpg",
	},
	{
		heading: "Hizmetler",
		href: "/hizmetler",
		subheading: "Neler yapıyoruz",
		imgSrc: "/images/services.jpg",
	},
	{
		heading: "İletişim",
		href: "/iletisim",
		subheading: "Bize ulaşın",
		imgSrc: "/images/contact.jpg",
	},
];

const NavLink: React.FC<iNavLinkProps> = ({
	heading,
	href,
	setIsActive,
	index,
	icon,
	externalHref,
	onClick,
	lang,
}) => {
	const ref = useRef<HTMLAnchorElement | null>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const handleMouseMove = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		x.set(mouseX / rect.width - 0.5);
		y.set(mouseY / rect.height - 0.5);
	};

	const handleClick = () => {
		return setIsActive(false);
	};


	const inner = (
		<div className="relative flex items-start">
			{/* Numarasiz satirlarda da basliklar ayni sutunda hizalansin diye
			    numara alani gorunmez birakilir, kaldirilmaz. */}
			<span
				aria-hidden={index === undefined}
				className="text-black transition-colors duration-500 text-3xl tracking-tight md:text-4xl md:tracking-normal font-thin mr-2"
			>
				{index === undefined ? (
					<span className="invisible">0.</span>
				) : (
					`${index}.`
				)}
			</span>
			<div className="flex flex-row gap-2">
				<motion.span
					variants={{
						initial: {x: 0},
						whileHover: {x: -16},
					}}
					transition={{
						type: "spring",
						staggerChildren: 0.075,
						delayChildren: 0.25,
					}}
					className="relative z-10 block text-3xl tracking-tight md:text-4xl md:tracking-normal font-extralight text-black transition-colors duration-500"
				>
					{heading.split("").map((letter, i) => {
						return (
							// inline-block bir boslugu sifir genislige dusurur;
							// "Hizmet Bölgeleri" bitişik yazılıyordu — whitespace-pre
							// boşluğun genişliğini korur
							<motion.span
								key={i}
								variants={{
									initial: {x: 0},
									whileHover: {x: 16},
								}}
								transition={{type: "spring"}}
								className="inline-block whitespace-pre"
							>
								{letter}
							</motion.span>
						);
					})}
				</motion.span>
			</div>
		</div>
	);

	return (
		<motion.div
			onClick={handleClick}
			initial="initial"
			whileHover="whileHover"
			lang={lang}
			className="group relative flex items-center justify-between gap-4 border-b border-black/30 py-4 transition-colors duration-500 md:py-5 uppercase"
		>
			{externalHref ? (
				<a
					ref={ref}
					onMouseMove={handleMouseMove}
					href={externalHref}
					{...(externalHref.startsWith("http")
						? {target: "_blank", rel: "noopener noreferrer"}
						: {})}
				>
					{inner}
				</a>
			) : href ? (
				<Link ref={ref} onMouseMove={handleMouseMove} href={href}>
					{inner}
				</Link>
			) : (
				<button
					type="button"
					onClick={onClick}
					/* button, ustundeki text-transform mirasini almiyor */
					className="text-left uppercase"
				>
					{inner}
				</button>
			)}

			{icon && (
				<span className="shrink-0 text-black/70" aria-hidden="true">
					{icon}
				</span>
			)}
		</motion.div>
	);
};

const Curve: React.FC = () => {
	const initialPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${window.innerHeight} Q-100 ${window.innerHeight / 2} 100 0`;
	const targetPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${window.innerHeight} Q100 ${window.innerHeight / 2} 100 0`;

	const curve: any = {
		initial: {d: initialPath},
		enter: {
			d: targetPath,
			transition: {duration: 1, ease: [0.76, 0, 0.24, 1]},
		},
		exit: {
			d: initialPath,
			transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]},
		},
	};

	return (
		<svg
			className="absolute top-0 -left-[99px] w-[100px] stroke-none h-full"
			style={{fill: "#d4af37"}}
		>
			<motion.path
				variants={curve}
				initial="initial"
				animate="enter"
				exit="exit"
			/>
		</svg>
	);
};

const CurvedNavbar: React.FC<
	iCurvedNavbarProps & {footer?: React.ReactNode}
> = ({setIsActive, navItems, footer, menuLabel}) => {
	const tCommon = useTranslations("common");
	const tNav = useTranslations("nav");
	const {targetLocale, toggle} = useLanguageSwitch();

	/**
	 * Numarasiz satirlar: sayfa degil, eylem olduklari icin sirali listenin
	 * disinda tutuluyorlar. Baglantilar `siteConfig`ten geliyor — burada
	 * daha once instagram.com / whatsapp.com gibi yer tutucular vardi ve
	 * kullaniciyi firmanin hesabina degil, servislerin ana sayfasina
	 * gonderiyordu.
	 */
	const actionItems = [
		{
			heading: tCommon("instagram"),
			externalHref: siteConfig.contact.instagram,
			icon: <InstagramIcon className="size-6" />,
		},
		{
			heading: tCommon("whatsapp"),
			externalHref: whatsappLink(),
			icon: <WhatsAppIcon className="size-6" />,
		},
		{
			heading: tCommon("email"),
			externalHref: mailLink,
			icon: <Mail className="size-6" />,
		},
		{
			// Etiket gidilecek dili soyler: TR'deyken "English"
			heading:
				targetLocale === "en"
					? tNav("switchToEnglish")
					: tNav("switchToTurkish"),
			lang: targetLocale,
			onClick: toggle,
			icon: <Languages className="size-6" />,
		},
	];

	return (
		<motion.div
			variants={MENU_SLIDE_ANIMATION}
			initial="initial"
			animate="enter"
			exit="exit"
			className="h-[100dvh] w-full max-w-screen-sm fixed right-0 top-0 z-[100] bg-gold-500 pointer-events-auto shadow-2xl"
		>
			<div className="h-full pt-11 flex flex-col justify-between">
				{/* Liste 10 satira cikti; kisa ekranlarda tasmasin diye kendi
				    icinde kayabiliyor. Lenis yumusak kaydirma tekerlegi sayfaya
				    aldigi icin `data-lenis-prevent` sart. */}
				<div
					data-lenis-prevent
					className="flex flex-col text-5xl gap-3 mt-0 px-10 md:px-24 overflow-y-auto overscroll-contain pb-8"
				>
					<div className="text-black border-b border-black/30 uppercase text-sm mb-0">
						<p>{menuLabel ?? "Menü"}</p>
					</div>
					<section className="bg-transparent mt-0">
						<div className="mx-auto max-w-7xl">
							{navItems.map((item, index) => (
								<NavLink
									key={item.heading}
									{...item}
									setIsActive={setIsActive}
									index={index + 1}
								/>
							))}
							{actionItems.map((item) => (
								<NavLink
									key={item.heading}
									{...item}
									setIsActive={setIsActive}
								/>
							))}
						</div>
					</section>
				</div>
				{footer}
			</div>
			<Curve />
		</motion.div>
	);
};

const CurvedMenu: React.FC<iHeaderProps> = ({
	navItems = defaultNavItems,
	menuLabel,
	footer,
}) => {
	const [isActive, setIsActive] = useState(false);
	const openAudioRef = useRef<HTMLAudioElement | null>(null);
	const closeAudioRef = useRef<HTMLAudioElement | null>(null);

	const handleClick = () => {
		if (isActive) {
			closeAudioRef.current?.play();
		} else {
			openAudioRef.current?.play();
		}
		setIsActive(!isActive);
	};

	return (
		<>
			<div className="relative lg:hidden z-[110]">
				<div
					onClick={handleClick}
					className={`z-50 flex size-10 cursor-pointer items-center justify-center transition-colors ${isActive ? "text-black hover:text-black/70" : "text-gold-500 hover:text-gold-400"}`}
				>
					<div className="relative flex h-5 w-6 flex-col items-center justify-between">
						<span
							className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${isActive ? "translate-y-2.5 rotate-45" : ""}`}
						></span>
						<span
							className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${isActive ? "opacity-0" : ""}`}
						></span>
						<span
							className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${isActive ? "-translate-y-2 -rotate-45" : ""}`}
						></span>
					</div>
				</div>
			</div>

			<AnimatePresence mode="wait">
				{isActive && (
					<CurvedNavbar
						setIsActive={setIsActive}
						navItems={navItems}
						menuLabel={menuLabel}
						footer={footer}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default CurvedMenu;
