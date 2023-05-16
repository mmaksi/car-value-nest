[33mcommit e4fda904e49553fb25104e63a02242a2b0d77c05[m
Author: mmaksi <mmaksi.dev@gmail.com>
Date:   Mon May 15 21:45:15 2023 +0200

    Added a [1;31mcustom[m interceptor that adds the current user to the request object and make a [1;31mcustom[m decorator give us access to the logged-in user, and we registered that [1;31mcustom[m interceptor on a global scope to the entire Nest app

[33mcommit 8db47f54d74aba8ebed70fcaacfb3258eabee92b[m
Author: mmaksi <mmaksi.dev@gmail.com>
Date:   Mon May 15 18:59:02 2023 +0200

    Serializing user data so that the controller doesn't return the password in the response object using [1;31mcustom[m serialize class and [1;31mcustom[m decorator

[33mcommit 2158794e0ef57c477131c3eea8e31bc5248e18cb[m
Author: mmaksi <mmaksi.dev@gmail.com>
Date:   Mon May 15 18:58:35 2023 +0200

    Serializing user data so that the controller doesn't return the password in the response object using [1;31mcustom[m serialize class and [1;31mcustom[m decorator
