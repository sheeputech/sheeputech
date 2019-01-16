package main

/*
 * go get -u github.com/go-sql-driver/mysql \
 *           github.com/gorilla/sessions \
 *           golang.org/x/crypto/bcrypt
 */

import (
	"fmt"
	"net"
	"net/http"
	"net/http/fcgi"
	"sheeputech/app/services/controller"

	"github.com/gorilla/mux"
)

func Authenticate(f func(http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return f
}

func main() {
	// TODO Prepare DB connection
	// TODO Prepare authentication

	l, err := net.Listen("tcp", ":9000") // Prepare to listen
	if err != nil {
		fmt.Println("some error occurred in net.Listen: ", err)
	}

	r := mux.NewRouter() // define gorilla/mux router

	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static/")))) // Load static files ( JavaScript, CSS, ...)

	// index
	r.HandleFunc("/", Authenticate(controller.IndexViewHandler))

	// samples
	r.HandleFunc("/samples/file_explorer", controller.SampleFileExplorerViewHandler)

	r.HandleFunc("/error", Authenticate(controller.ErrorViewHandler))
	r.HandleFunc("/signup", Authenticate(controller.SignupViewHandler))
	r.HandleFunc("/login", Authenticate(controller.LoginViewHandler))
	r.HandleFunc("/logout", Authenticate(controller.LogoutViewHandler))

	// http.ListenAndServe(":9000", r)

	err = fcgi.Serve(l, r) // Serve ( here using "FastCGI" )
	if err != nil {
		fmt.Println("some error occurred in fcgi.Serve: ", err)
	}
}
