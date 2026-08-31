"use client";
import React, {useState, useRef} from "react";

import {motion, useMotionValue, AnimatePresence} from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { SocialTooltip, SocialItem } from "@/components/ui/social-media";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

interface iNavItem {
	heading: string;
	href: string;
	subheading?: string;
	imgSrc?: string;
}

interface iNavLinkProps extends iNavItem {
	setIsActive: (isActive: boolean) => void;
	index: number;
}

interface iCurvedNavbarProps {
	setIsActive: (isActive: boolean) => void;
	navItems: iNavItem[];
}

interface iHeaderProps {
	navItems?: iNavItem[];
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

const socialLinks: SocialItem[] = [
	{
		href: "https://instagram.com",
		ariaLabel: "Instagram",
		tooltip: "Instagram",
		color: "#E1306C",
		icon: <InstagramIcon className="size-5" />,
	},
	{
		href: "https://whatsapp.com",
		ariaLabel: "WhatsApp",
		tooltip: "WhatsApp",
		color: "#25D366",
		icon: <WhatsAppIcon className="size-5" />,
	},
	{
		href: "mailto:info@royalreklamsamsun.com",
		ariaLabel: "E-posta",
		tooltip: "E-posta",
		color: "#D4AF37", // Gold
		icon: <Mail className="size-5" />,
	},
];

const CustomFooter: React.FC = () => {
	return (
		<div className="flex flex-col gap-6 md:flex-row w-full justify-between text-black px-10 md:px-24 py-5 mb-4">
			<LanguageSwitcher variant="dark" className="w-fit" />
			<SocialTooltip items={socialLinks} />
		</div>
	);
};

const NavLink: React.FC<iNavLinkProps> = ({
	heading,
	href,
	setIsActive,
	index,
}) => {
	const ref = useRef<HTMLAnchorElement | null>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const handleMouseMove = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		const rect = ref.current!.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		x.set(mouseX / rect.width - 0.5);
		y.set(mouseY / rect.height - 0.5);
	};

	const handleClick = () => {
		return setIsActive(false);
	};

	const isExternalLink = href.startsWith("http");
	const linkProps = isExternalLink
		? {target: "_blank", rel: "noopener noreferrer"}
		: {};

	return (
		<motion.div
			onClick={handleClick}
			initial="initial"
			whileHover="whileHover"
			className="group relative flex items-center justify-between border-b border-black/30 py-4 transition-colors duration-500 md:py-8 uppercase"
			{...linkProps}
		>
			<Link ref={ref} onMouseMove={handleMouseMove} href={href}>
				<div className="relative flex items-start">
					<span className="text-black transition-colors duration-500 text-3xl tracking-tight md:text-4xl md:tracking-normal font-thin mr-2">
						{index}.
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
									<motion.span
										key={i}
										variants={{
											initial: {x: 0},
											whileHover: {x: 16},
										}}
										transition={{type: "spring"}}
										className="inline-block"
									>
										{letter}
									</motion.span>
								);
							})}
						</motion.span>
					</div>
				</div>
			</Link>
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
> = ({setIsActive, navItems, footer}) => {
	return (
		<motion.div
			variants={MENU_SLIDE_ANIMATION}
			initial="initial"
			animate="enter"
			exit="exit"
			className="h-[100dvh] w-full max-w-screen-sm fixed right-0 top-0 z-[100] bg-gold-500 pointer-events-auto shadow-2xl"
		>
			<div className="h-full pt-11 flex flex-col justify-between">
				<div className="flex flex-col text-5xl gap-3 mt-0 px-10 md:px-24">
					<div className="text-black border-b border-black/30 uppercase text-sm mb-0">
						<p>Menü</p>
					</div>
					<section className="bg-transparent mt-0">
						<div className="mx-auto max-w-7xl">
							{navItems.map((item, index) => {
								return (
									<NavLink
										key={item.href}
										{...item}
										setIsActive={setIsActive}
										index={index + 1}
									/>
								);
							})}
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
	footer = <CustomFooter />,
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
						footer={footer}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default CurvedMenu;
