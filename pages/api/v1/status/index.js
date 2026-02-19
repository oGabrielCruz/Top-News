function status(request, response) {
  response.status(200).send({ status: "ok são são" });
}

export default status