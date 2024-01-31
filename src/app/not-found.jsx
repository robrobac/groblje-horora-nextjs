const { default: Link } = require("next/link")

const NotFound = () => {
    return (
        <div>
            <h1>Page Not Found</h1>
            <Link href="/">Go back home</Link>
        </div>
    )
}

export default NotFound;