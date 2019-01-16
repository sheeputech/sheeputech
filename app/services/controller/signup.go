package controller

import (
	"net/http"
)

/*
 * Signup Page
 */
func SignupViewHandler(w http.ResponseWriter, r *http.Request)  {
	w.Write([]byte("Here is SignupViewHandler."))
}