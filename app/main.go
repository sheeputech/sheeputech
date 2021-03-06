package main

import (
	"log"
	"net"
	"net/http"
	"net/http/fcgi"
	"sheeputech/app/services/controller"

	"github.com/gorilla/mux"
)

func main() {
	l, err := net.Listen("tcp", ":9000")
	if err != nil {
		log.Println("some error occurred in net.Listen: ", err)
	}

	r := mux.NewRouter()
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))

	r.HandleFunc("/", controller.IndexViewHandler)
	r.HandleFunc("/samples/file_explorer", controller.SampleFileExplorerViewHandler)

	r.HandleFunc("/error", controller.ErrorViewHandler)
	r.HandleFunc("/signup", controller.SignupViewHandler)
	r.HandleFunc("/login", controller.LoginViewHandler)
	r.HandleFunc("/logout", controller.LogoutViewHandler)

	err = fcgi.Serve(l, r)
	if err != nil {
		log.Println("some error occurred in fcgi.Serve: ", err)
		panic(err)
	}
	log.Println("Go started listening and serving HTTP.")
}
