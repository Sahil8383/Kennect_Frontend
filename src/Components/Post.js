import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Avatar
} from "@material-tailwind/react";

export function PostCard({ madeBy, content, onClickFun }) {

    return (
        <Card className="
            mt-6 
            w-96
            smt:w-64
            mdt:w-52
            lgt:w-60
            xlt:w-80
        ">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                <Avatar 
                    src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png" 
                    alt="avatar"
                    size="sm"  
                    withBorder={true}
                /> {madeBy}
                </Typography>
                <Typography>
                    {
                        content.length > 100 ? content.slice(0, 100) + '...' : content
                    }
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button size="sm" variant="text" color="blue" className="flex items-center gap-2" onClick={onClickFun}>
                    View Post
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                    </svg>
                </Button>
            </CardFooter>
        </Card>
    );
}