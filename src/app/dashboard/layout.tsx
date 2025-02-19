import Header from "../ui/header/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header loggedIn={true} />
            <main>{children}</main>
        </div>
    );
}
