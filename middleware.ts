// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// export default clerkMiddleware((auth, req) => {
//     if (isProtectedRoute(req)) auth().protect();
//   }); 

// const isProtectedRoute = createRouteMatcher([
//     '/dashboard',
//     '/forum(.*)',
// ]);


// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };



// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'


// export default clerkMiddleware(async (auth, req) => {
//   if (isProtectedRoute(req)) await auth.protect()
// })
// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/'])


// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }


import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth();
  
  if (isProtectedRoute(req) && !authObject.userId) {
    // Redirect to the sign-in page if the user is not authenticated
    return authObject.redirectToSignIn();
  }

  return NextResponse.next(); // Proceed as normal
});

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)", 
]);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

