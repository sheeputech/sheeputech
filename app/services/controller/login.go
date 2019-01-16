package controller

import (
	"net/http"
)

/*
 * Login page
 */
func LoginViewHandler(w http.ResponseWriter, r *http.Request)  {
	w.Write([]byte("Here is LoginViewHandler."))
}
